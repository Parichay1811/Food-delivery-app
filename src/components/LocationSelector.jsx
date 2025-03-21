import { useState } from 'react';
import { useLocation } from '../context/LocationContext';
import { MapPin } from 'lucide-react';
import styles from './LocationSelector.module.css';

const popularCities = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Delhi', state: 'Delhi' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Hyderabad', state: 'Telangana' },
];

const LocationSelector = () => {
  const { location, updateLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (selectedLocation) => {
    updateLocation(selectedLocation);
    setIsOpen(false);
  };

  const filteredCities = popularCities.filter(city =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.locationSelector}>
      <button
        className={styles.locationButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin size={16} />
        <span>{location?.city}, {location?.state}</span>
      </button>

      {isOpen && (
        <div className={styles.locationDropdown}>
          <input
            type="text"
            placeholder="Search city or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.cityList}>
            {filteredCities.map((city) => (
              <button
                key={`${city.city}-${city.state}`}
                className={styles.cityOption}
                onClick={() => handleLocationSelect(city)}
              >
                {city.city}, {city.state}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 
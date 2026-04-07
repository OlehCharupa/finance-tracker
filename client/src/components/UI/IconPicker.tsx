import { useState } from 'react';
import { TextField, Box} from '@mui/material';
import { ICON_MAP, type IconName } from '../../model/iconMap';
import { useDebounce } from '../../hook/useDebounce';

type Props = {
  onSelect: (icon: IconName | null) => void;
  selectedIcon?: IconName | null;
};

export const IconPicker = ({
  onSelect,
  selectedIcon,
}: Props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);

  const icons = Object.keys(ICON_MAP).filter(name =>
    name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
      <Box>
        <TextField
          fullWidth
          placeholder="Пошук ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box
          mt={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
            gap: 1,
          }}
        >
          {icons.map((name) => {
            const Icon = ICON_MAP[name as keyof typeof ICON_MAP];
            const isActive = selectedIcon === name;

            return (
              <Box
                key={name}
                onClick={() => {
                  onSelect(name as IconName | null);
                }}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: isActive
                    ? '2px solid #1976d2'
                    : '1px solid #ddd',
                  backgroundColor: isActive
                    ? 'rgba(25,118,210,0.1)'
                    : 'transparent',
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Icon />
              </Box>
            );
          })}
        </Box>
      </Box>
  );
};
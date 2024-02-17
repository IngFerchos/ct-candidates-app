import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import { InputLabel, Select } from '@mui/material';

export default function OptionsFilter({ dataUsers, filters, setFilters }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAll = () => setFilters({ ...filters, FilterCompleted: false, FilterUncompleted: false });
  const handleCompleted = () => setFilters({ ...filters, FilterCompleted: true, FilterUncompleted: false });
  const handleUncompleted = () => setFilters({ ...filters, FilterCompleted: false, FilterUncompleted: true });
  const handleChangeUserCreated = (event) => setFilters({ ...filters, FilterUserCreate: event.target.value });
  const handleChangeUserAssigned = (event) => setFilters({ ...filters, FilterUserAssigned: event.target.value });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Filter Options">
          <FilterListIcon
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          </FilterListIcon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Divider />
        <MenuItem onClick={handleAll}>
          {filters.FilterCompleted === false && filters.FilterUncompleted === false &&
            <CheckIcon>
              <ModeEditIcon fontSize="small" />
            </CheckIcon>
          }
          All
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCompleted}>
          {filters.FilterCompleted === true &&
            <CheckIcon>
              <ModeEditIcon fontSize="small" />
            </CheckIcon>
          }
          Completed
        </MenuItem>
        <MenuItem onClick={handleUncompleted}>
          {filters.FilterUncompleted === true &&
            <CheckIcon>
              <ModeEditIcon fontSize="small" />
            </CheckIcon>
          }
          Uncompleted
        </MenuItem>
        <Divider />
        <Divider />
        <MenuItem onClick={() => {
          handleClose();
        }}>
          <InputLabel style={{ position: 'absolute', marginTop: '-55px' }} id="demo-simple-select-label">CreatedBy</InputLabel>
          <Select
            style={{ width: '100%', marginTop: '25px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.FilterUserCreate}
            label="User"
            onChange={handleChangeUserCreated}
          >
            <MenuItem key={0} value={''}>All</MenuItem>
            {dataUsers.current.map(x => {
              return <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
            })}
          </Select>
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose();
        }}>
          <InputLabel style={{ position: 'absolute', marginTop: '-55px' }} id="demo-simple-select-label">AssignedTo</InputLabel>
          <Select
            style={{ width: '100%', marginTop: '25px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.FilterUserAssigned}
            label="User"
            onChange={handleChangeUserAssigned}
          >
            <MenuItem key={0} value={''}>All</MenuItem>
            {dataUsers.current.map(x => {
              return <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>
            })}
          </Select>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
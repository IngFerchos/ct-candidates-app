
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { visuallyHidden } from '@mui/utils';
import OptionsTask from './OptionsTask';
import SearchText from './SearchText';
import Divider from '@mui/material/Divider';
import Axios from '../../config/axios'
import AddEditDialog from './AddEditDialog';
import ConfirmDialog from './ConfirmDialog';
import OptionsFilter from './OptionsFilter';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) { return -1; }
  if (b[orderBy] > a[orderBy]) { return 1; }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'order',
    numeric: false,
    disablePadding: false,
    label: 'Order Description',
  },
  {
    id: 'usercreate',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'userassigned',
    numeric: false,
    disablePadding: false,
    label: 'Assigned to',
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: '',
  },

];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, setOpen, option, textFilter, setTextFilter, dataUsers, filters, setFilters } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        color="inherit"
        variant="subtitle1"
        component="div"
        style={{ textAlign: 'justify' }}
      >
        ({numSelected}) completed
      </Typography>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Search">
        <SearchText textFilter={textFilter} setTextFilter={setTextFilter} />
      </Tooltip>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="New Task">
        <IconButton>
          <NoteAddIcon onClick={() => { setOpen(true); option.current = 1; }} />
        </IconButton>
      </Tooltip>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton>
        <OptionsFilter dataUsers={dataUsers} filters={filters} setFilters={setFilters} />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TableTasks({ currentUser }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const dataUsers = React.useRef([]);
  const currentTask = React.useRef(null);
  const option = React.useRef(1);
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [recharge, setRecharge] = React.useState(false);

  const [textFilter, setTextFilter] = React.useState('');
  const [filters, setFilters] = React.useState({
    FilterCompleted: false,
    FilterUncompleted: false,
    FilterUserCreate: '',
    FilterUserAssigned: ''
  });

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await Axios.get("users", {}, { headers: {} });
      setUsers([...data]);
      dataUsers.current = [...data];
    }
    getUsers();
  }, [])

  useEffect(() => {
    const getTasks = async () => {
      let { data } = await Axios.get("tasks");
      setRows([...data.map(x => ({ ...x, usercreateId: x.usercreate, usercreate: dataUsers.current?.find(y => y.id === x.usercreate)?.name, userassignedId: x.userassigned, userassigned: dataUsers.current?.find(y => y.id === x.userassigned)?.name }))]);
      setSelected(data.filter(x => x.completed === 1).map(y => y.id));
      //console.log(data.filter(x=>x.completed===1).map(y=>y.id));
      setTimeout(() => {
        let pages;
        (data.length % rowsPerPage) === 0 ?
          pages = parseInt(data.length / rowsPerPage) - 1 :
          pages = parseInt(data.length / rowsPerPage)
        handleRequestSort('id');
        setPage(pages);
      }, 500);
    }
    getTasks();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      let pages;
      (rows.length % rowsPerPage) === 0 ?
        pages = parseInt(rows.length / rowsPerPage) - 1 :
        pages = parseInt(rows.length / rowsPerPage)
      handleRequestSort('id');
      setPage(pages);
    }, 500);

  }, [recharge])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = async (event, id, row) => {
    console.log('clicked ID', event);
    console.log('id', id);
    console.log('row', row);
    currentTask.current = row;
    //To disabled in the last colum, so that you can press the options delete and modify
    if (event.nativeEvent.srcElement.cellIndex > 4) return;
    if (event.nativeEvent.srcElement.cellIndex === undefined && event.nativeEvent.target.checked === undefined) return;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    //Update in the table
    row.completed = row.completed === 0 ? 1 : 0;
    const newTask = {
      ...currentTask.current,
      usercreate: currentTask.current.usercreateId,
      userassigned: currentTask.current.userassignedId
    }
    console.log(newTask)
    await Axios.put("tasks/" + currentTask.current.id, newTask).then(response => {
      console.log(response);
    });
    currentTask.current = row;
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      {open && <AddEditDialog open={open} setOpen={setOpen} dataUsers={dataUsers} option={option} currentUser={currentUser} setRows={setRows} currentTask={currentTask} setRecharge={setRecharge} page={page} setPage={setPage} />}
      <ConfirmDialog open={openConfirmation} setOpen={setOpenConfirmation} page={page} setPage={setPage} currentTask={currentTask} setRows={setRows} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} setOpen={setOpen} option={option} textFilter={textFilter} setTextFilter={setTextFilter} dataUsers={dataUsers} filters={filters} setFilters={setFilters} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy || 'asc'}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows
                .filter(data => data.title.toUpperCase().includes(textFilter.toUpperCase()) || data.order.toUpperCase().includes(textFilter.toUpperCase()))
                .filter(data => (filters.FilterCompleted ? data.completed === 1 : data))
                .filter(data => (filters.FilterUncompleted ? data.completed === 0 : data))
                .filter(data => (filters.FilterUserCreate !== '' ? parseInt(data.usercreateId) === parseInt(filters.FilterUserCreate) : data))
                .filter(data => (filters.FilterUserAssigned !== '' ? parseInt(data.userassignedId) === parseInt(filters.FilterUserAssigned) : data))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId, }}
                        />
                      </TableCell>
                      <TableCell align="left" component="th" id={labelId} scope="row" padding="none">{row.title}</TableCell>
                      <TableCell style={{ width: 360 }} align="center">{row.order}</TableCell>
                      <TableCell align="center">{row.usercreate}</TableCell>
                      <TableCell align="center">{row.userassigned}</TableCell>
                      <TableCell align="right"> {row.usercreateId.toString().trim() === currentUser.Id.toString().trim() && <OptionsTask setOpen={setOpenConfirmation} setOpenEdit={setOpen} option={option} />} </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
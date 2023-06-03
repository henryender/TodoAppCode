import { Box, Paper, TextField, Typography, IconButton, Tooltip, Button, } from '@mui/material'
import React from 'react'
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';


function MainApp() {
    const [input, setInput] = useState('')
    const [item, setItem] = useState([])
    const [editId, setEditId] = useState(0)
    const [completed, setCompleted] = useState([])
    const [error, setError] = useState('')


    const Addhandler = (e) => {
        // Add handler to put tasks to the field
        if (input !== '') {
            setError('')
            setItem([...item, { input, id: `${input}-${Date.now()}` }]);
            setInput('')
        } else {
            setError('Input field is empty! ')
        }
        // This works with Edit handler to Update the changes made to the List
        if (editId) {
            const editTodo = item.find((i) => i.id === editId);
            const UpdatedTodos = item.map((t) => t.id === editTodo.id
                ? (t = { id: t.id, input }) : { id: t.id, input: t.input }
            );
            setItem(UpdatedTodos);
            setEditId(0);
            setInput('');
            return;
        }
    }
    //Deletes elements from the Tasks List
    const deleteHandler = (id) => {
        setItem([...item.filter((x) => x.id !== id)]);


    }
    // To Set the Input with the List to be Edited
    const EditHandler = (id) => {
        const editTodo = item.find((i) => i.id === id);
        setInput(editTodo.input);
        setEditId(id)
    }
    // To Add Items from the Tasks List to the Completed
    const AddCompleted = (input) => {
        setCompleted([...completed, { input, id: `${input}-${Date.now()}` }])

    }

    //To delete Items from the Completed List
    const deleteCompleted = (id) => {
        setCompleted([...completed.filter((x) => x.id !== id)])
    }

    const deleteAllCompleted = () => {
        setCompleted([])
    }
    return (
        <>
            <Paper elevation={4} sx={{ width: '80%', margin: 'auto' }} >

                <Box width='80%' margin='auto' mt={10} >
                    <Paper elevation={3}
                        sx={{ borderRadius: "15px", backgroundColor: "lightgreen", marginBottom: '10px' }} >
                        <Typography
                            sx={{ fontFamily: 'Playfair, serif' }}
                            fontSize={{
                                lg: 35, md: 30,
                                sm: 25, xs: 25
                            }}
                            textAlign='center'>
                            TODO LIST
                            <ListAltIcon
                                sx={{
                                    position: 'relative', top: "5px",
                                    fontSize: { xs: '25px', 
                                    lg: '32px' }
                                }}

                            />
                        </Typography>
                    </Paper>
                    <Typography
                        style={{
                            textAlign: 'center', color: 'red', marginBottom: '-20px',
                            fontFamily: 'Playfair, serif'
                        }}>{error}</Typography>
                </Box>

                <Box
                    width={{ lg: '75%', xs: '85%' }}
                    margin="auto" mt={10} sx={{ display: 'flex' }}>
                    <TextField label="Tasks"
                        variant="outlined"
                        sx={{ marginBottom: '10px', width: "100%" }}
                        size='small'
                        onChange={(e) => setInput(e.target.value)} value={input} />
                    {editId ?
                        <Tooltip title='Update Changes'>
                            <PostAddIcon
                                sx={{
                                    fontSize: "45px",
                                    position: 'relative',
                                    bottom: "2px",
                                    color: 'green',
                                    '&:hover': {
                                        color: 'lightgreen',
                                        opacity: [0.9, 0.8, 0.7],
                                    }, cursor: 'pointer'
                                }} onClick={Addhandler} />
                        </Tooltip>
                        :
                        <Tooltip title='Add New Task'>
                            <AddBoxIcon sx={{
                                fontSize: "45px", position: 'relative',
                                bottom: "2px",
                                color: 'green', '&:hover': {
                                    color: 'lightgreen',
                                    opacity: [0.9, 0.8, 0.7],
                                }, cursor: 'pointer'
                            }} onClick={Addhandler} />
                        </Tooltip>}
                </Box>

                <Box width={{ lg: '80%', xs: '90%' }} margin="auto"
                    display={{ lg: "flex", md: 'flex', sm: 'flex' }}
                    justifyContent="space-between">
                    <Paper sx={{ width: { lg: '50%', xs: '90%' }, margin: "3%" }} >
                        <Typography
                            textAlign='center'
                            sx={{ fontSize: { xs: '15px', lg: '20px' },fontFamily: 'Playfair, serif' }}>
                            Tasks ({item.length})<br /><hr />
                            <span>
                                {item?.length === 0 ? <p style={{fontFamily: 'Playfair, serif'}}>No Tasks Added/ Uncompleted</p> :
                                    item.map((data) => {
                                        return <Box key={data.id} >
                                            <IconButton onClick={() => deleteHandler(data.id)}>
                                                <Tooltip title='Delete'>
                                                    <DeleteIcon
                                                        fontSize='small'
                                                        color='error'
                                                        sx={{ fontSize: { xs: '15px', lg: '20px' } }} />
                                                </Tooltip>
                                            </IconButton>
                                            {data.input}

                                            <IconButton onClick={() => EditHandler(data.id)}>
                                                <Tooltip title='Edit'>
                                                    <BorderColorIcon
                                                        fontSize='small'
                                                        color='info'
                                                        sx={{ fontSize: { xs: '15px', lg: '20px' } }}
                                                    />
                                                </Tooltip>
                                            </IconButton>

                                            <IconButton onClick={() => {
                                                AddCompleted(data.input);
                                                deleteHandler(data.id)
                                            }}>
                                                <Tooltip title="Mark Completed">
                                                    <DoneOutlineIcon
                                                        fontSize='small'
                                                        color='success'
                                                        sx={{ fontSize: { xs: '15px', lg: '20px' } }} />
                                                </Tooltip>
                                            </IconButton>
                                        </Box>
                                    })}
                            </span>
                        </Typography>
                    </Paper>
                    <Typography display={{ lg: 'none',fontFamily: 'Playfair, serif' }}><br /></Typography>
                    <Paper sx={{ width: { lg: '50%', xs: '90%' }, margin: '3%' }}>
                        <Typography textAlign='center' 
                        sx={{ fontSize: { xs: '15px', lg: '20px',fontFamily: 'Playfair, serif' } }}>
                            Completed ({completed.length})<br /><hr />
                            <span>
                                {completed?.length === 0 ? 
                                <p style={{fontFamily: 'Playfair, serif'}}>No Tasks Completed</p> :
                                    completed.map((info) =>
                                        <Box key={info.id}>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => deleteCompleted(info.id)}>
                                                    <DeleteIcon color="error" fontSize="small" sx={{ fontSize: { xs: '15px', lg: '20px' } }} />
                                                </IconButton>
                                            </Tooltip>
                                            {info.input}<br />
                                        </Box>)}
                            </span>
                        </Typography>
                    </Paper>
                </Box>

                {
                    completed.length > 3 &&
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            onClick={deleteAllCompleted}
                            variant='contained'
                            size='small'
                            sx={{
                                margin: '10px',
                                fontSize: { lg: '13px', xs: '10px' },
                                backgroundColor: "lightgreen", color: 'black', '&:hover': {
                                    backgroundColor: 'lightgreen',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}>
                            Delete All Completed</Button>
                    </Box>
                }
                <Typography><br /></Typography>
            </Paper>
        </>
    )
}

export default MainApp
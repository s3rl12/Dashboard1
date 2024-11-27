import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import BugReportIcon from '@mui/icons-material/BugReport';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import ChartExample from './components/ChartExample';
import FullFeaturedCrudGridUser from './components/FullFeaturedCrudGridUser';
import FullFeaturedCrudGridDocuments from './components/FullFeaturedCrudGridDocuments';

const dashboardAdmin = () => {
    return (
        <>
            <div className="flex flex-row h-full w-full gap-4 pl-4 pt-4 mt-0">
                <div className="flex flex-col h-full w-full gap-3">
                    <div className="flex flex-row h-full w-full gap-4 text-left">
                        <div className="bg-white rounded-lg pr-24 pl-5 py-3">
                            <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
                            <p className='text-[#222B45] font-bold text-xl'>614</p>
                        </div>
                        <div className="bg-white rounded-lg pr-24 pl-5 py-3">
                            <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
                            <p className='text-[#222B45] font-bold text-xl'>614</p>
                        </div>
                        <div className="bg-white rounded-lg pr-24 pl-5 py-3">
                            <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
                            <p className='text-[#222B45] font-bold text-xl'>614</p>
                        </div>
                        <div className="bg-white rounded-lg pr-24 pl-5 py-3">
                            <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
                            <p className='text-[#222B45] font-bold text-xl'>614</p>
                        </div>
                    </div>
                    <div className="flex flex-row h-full gap-2">
                        <div className='flex flex-col h-full gap-2'>
                            <div className="flex flex-row h-full gap-2">
                                <div className="flex flex-row h-full bg-white p-4 rounded-lg gap-4">
                                    <ChartExample />
                                </div>
                                <div className="flex flex-col w-1/4 p-4 px-6 gap-4  bg-white rounded-lg">
                                    {/* Espacio para otro contenido */}
                                    <h1 className='font-bold'>Trafico por area</h1>
                                    <div className='flex flex-row text-xs'>
                                        1° DESPACHO
                                    </div>
                                    <div className='flex flex-row text-xs'>
                                        2° DESPACHO
                                    </div>
                                    <div className='flex flex-row text-xs'>
                                        3° DESPACHO
                                    </div>
                                    <div className='flex flex-row text-xs'>
                                        4° DESPACHO
                                    </div>
                                </div>
                            </div>
                            <div className='flex h-full w-full bg-white rounded-lg'>
                                <FullFeaturedCrudGridDocuments />
                            </div>
                        </div>
                        <div className='flex h-full bg-white rounded-lg'>
                            <FullFeaturedCrudGridUser />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default dashboardAdmin;

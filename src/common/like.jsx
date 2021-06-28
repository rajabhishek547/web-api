import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
const Like  = (props) => {
    return ( 
             props.liked ? (<FavoriteIcon style={{cursor:"pointer"}} onClick ={props.onClick}/>):
             (<FavoriteBorderIcon style={{cursor:"pointer"}}  onClick ={props.onClick}/>)
         );
} 
export default Like;
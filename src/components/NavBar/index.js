import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
    let params = useParams();
    let subredditName = params.subredditName ? params.subredditName: 'analog';
    let categoryName = params.categoryName ? params.categoryName: 'hot';
    let timeName = params.timeName ? params.timeName: 'day';
    const [subreddit, setSubreddit] = useState(subredditName);
    const [category, setCategory] = useState(categoryName);
    const [time, setTime] = useState(timeName);

    function keyPress(e) {
        if(e.keyCode == 13){
           console.log('value', e.target.value);
        }
     }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <TextField id="subreddit" label="subreddit" variant="outlined" value={subreddit} onChange={setSubreddit}/>
            <TextField id="category" label="category" variant="outlined" value={category}/>
            <TextField id="time" label="time" variant="outlined" value={time}/>
            {/* <a className="navbar-brand" href="#">analog/top/all</a> */}
        </nav>
    )
}

export default NavBar;

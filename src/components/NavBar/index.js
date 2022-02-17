import { TextField, InputAdornment, MenuItem } from '@mui/material';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
    let params = useParams();
    const [searchParams] = useSearchParams();

    let subredditName = params.subredditName ? params.subredditName: 'analog';
    let categoryName = params.categoryName ? params.categoryName: 'hot';
    let timeName = searchParams.has('t') ? searchParams.get('t'): 'day';

    const [subreddit, setSubreddit] = useState(subredditName);
    const [category, setCategory] = useState(categoryName);
    const [time, setTime] = useState(timeName);

    const categories = [
    {
        value: 'hot',
        label: 'hot',
    },
    {
        value: 'new',
        label: 'new',
    },
    {
        value: 'rising',
        label: 'rising',
    },
    {
        value: 'top',
        label: 'top',
    },
    ];

    const times = [
    {
        value: 'hour',
        label: 'hour',
    },
    {
        value: 'day',
        label: 'day',
    },
    {
        value: 'week',
        label: 'week',
    },
    {
        value: 'month',
        label: 'month',
    },
    {
        value: 'year',
        label: 'year',
    },
    {
        value: 'all',
        label: 'all',
    },
    ];

    const handleSubredditChange = (event) => {
        setSubreddit(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        let new_url = "/r/" + subreddit + "/" + event.target.value;
        navigate(new_url, { replace: true });
        window.location.reload();
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
        let new_url = "/r/" + subreddit + "/" + category + "/?t=" + event.target.value;
        navigate(new_url, { replace: true });
        window.location.reload();
    };

    let navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <TextField
                id="subreddit"
                label="subreddit"
                variant="outlined"
                value={subreddit}
                onChange={handleSubredditChange}
                onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        setSubreddit(subreddit)
                        let new_url = "/r/" + subreddit;
                        navigate(new_url, { replace: true });
                        window.location.reload();
                        ev.preventDefault();
                    }
                }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">/r/</InputAdornment>,
                }}
            />

            <TextField
                id="category"
                select
                label="category"
                value={category}
                onChange={handleCategoryChange}
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {category === 'top' &&
                <TextField
                    id="time"
                    select
                    label="time"
                    value={time}
                    onChange={handleTimeChange}
                >
                    {times.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            }

        </nav>
    )
}

export default NavBar;

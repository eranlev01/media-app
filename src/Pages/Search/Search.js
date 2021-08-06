import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { TextField, createMuiTheme, ThemeProvider, Button, Tab, Tabs } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import './Search.css';
import { Autocomplete } from '@material-ui/lab';
import debounce from "lodash.debounce";
const CustomPagination = React.lazy(() => import('../../Components/MainDashBoard/Pagination/CustomPagination'));
const ContentCard = React.lazy(() => import('../../Components/MainDashBoard/ContentCard/ContentCard'));

const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [searchOptions, setSearchOptions] = useState([]);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchValue}&page=${page}&include_adult=false`);
            setContent(data.results);
            setNumOfPages(data.total_pages);
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const fetchAutoCompleteOptions = async () => {
        try{
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchValue}`);
            setSearchOptions(data.results)
        }
        catch(error) {
            console.log(error)
        }
    }
// eslint-disable-next-line 
    const delayedHandleChange = useCallback(debounce(fetchAutoCompleteOptions, 500), [searchValue]);

    const handleInputChange = value => {
        setSearchValue(value);
    }

    useEffect(() => {
        window.scroll(0, 0);
        if (searchValue) {
            delayedHandleChange()
            
        }
        return delayedHandleChange.cancel;
    }, [type, page, searchValue, delayedHandleChange]);

    return (
        <div>
            <Suspense fallback={'Loading.....'}>
                <ThemeProvider theme={darkTheme}>
                    <div className="search">
                        <Autocomplete
                            freeSolo
                            style={{ width: '100%' }}
                            id="free-solo-2-demo"
                            disableClearable
                            onSelect={e => handleInputChange(e.target.value)}
                            options={searchOptions.map((option) => option.title || option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ flex: 1 }}
                                    width="100%"
                                    className="searchBox"
                                    label="Search"
                                    variant="filled"
                                    onChange={e => handleInputChange(e.target.value)}
                                    value={searchValue}
                                    InputProps={{ ...params.InputProps, type: 'search' }}

                                />
                            )}
                        />
                        <Button varient="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}>
                            <SearchIcon />
                        </Button>
                    </div>
                    <Tabs value={type} indicatorColor='primary' textColor='primary' onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }} style={{ paddingBottom: 5 }} >
                        <Tab style={{ width: '50%' }} label='Search Movies' />
                        <Tab style={{ width: '50%' }} label='Search TV Series' />
                    </Tabs>
                </ThemeProvider>
                <div className="results">
                    {content &&
                        content.map((c) => (
                            <ContentCard
                                overview={c.overview}
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type={type ? "tv" : "movie"}
                                vote_average={c.vote_average}
                            />
                        ))}
                    {searchValue &&
                        !content &&
                        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                </div>
                {numOfPages > 1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )}
            </Suspense>
        </div >
    )
}

export default Search

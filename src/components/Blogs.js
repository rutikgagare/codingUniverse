import BlogItem from "./BlogItem";
import React, { useEffect, useState } from "react";
import classes from './Blogs.module.css';
import { useSelector } from "react-redux";

const Blogs = () => {
    const blogItems = useSelector(state => state.article.items);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayContent, setDisplayContent] = useState([]);


    useEffect(() => {
        setDisplayContent(blogItems);
    }, [blogItems])


    const tagsData = [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'React' },
        { id: 5, name: 'C++' },
        { id: 6, name: 'DSA' },
        { id: 7, name: 'Front-end' },
        { id: 8, name: 'Rules' },
    ];


    const handleSearch = () => {
        if (searchTerm.length !== 0) {
            setDisplayContent(blogItems.filter((article) => {
                return article.title.includes(searchTerm) || article.content.includes(searchTerm) || article.plaintext.includes(searchTerm) || article.title.includes(searchTerm.toLowerCase()) || article.plaintext.includes(searchTerm.toLowerCase()) || article.content.includes(searchTerm.toLowerCase()) || article.content.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)) || article.title.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)) || article.plaintext.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1))
            }))
        }

        const element = document.querySelector(`.${classes.blogs}`);
        if (element) {
            const yOffset = -100; // Adjust the yOffset value as per your requirement
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            // Use a timeout to ensure smooth scrolling in mobile devices
            setTimeout(() => {
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
        }
        setSearchTerm('');
    }

    // Handler for selecting/deselecting a tag
    const handleTagSelection = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((id) => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    useEffect(() => {
        if (selectedTags.length == 0) {
            setDisplayContent(blogItems);
        }
        else {
            setDisplayContent(blogItems.filter((article) => {
                return selectedTags.some((tagId) => article?.tags?.includes(tagId));
            }));
        }
    }, [selectedTags]);

    return (
        <>
            <div className={classes.search}>
                <input type="text" placeholder="Search Article" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value.trim()) }} />
                <button onClick={handleSearch} >Search</button>
            </div>

            <div className={classes.tags}>
                {tagsData.map((tag) => (
                    <span
                        key={tag.id}
                        onClick={() => handleTagSelection(tag.id)}
                        className={`${selectedTags.includes(tag.id) ? classes.active : ''}`}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>

            <div className={classes.blogs}>
                {displayContent && displayContent.length !== 0 && displayContent.map((item) => {
                    return (<BlogItem key={item.id} id={item.id} title={item.title} content={item.content} plaintext={item.plaintext} date={item.date} author={item.author} category={item.category}></BlogItem>);
                })
                }
            </div>
        </>

    );
}

export default Blogs;
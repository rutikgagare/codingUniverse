import BlogItem from "./BlogItem";
import React, { useState } from "react";
import classes from './Blogs.module.css';
import { useSelector } from "react-redux";

const Blogs = () => {
    const blogItems = useSelector(state => state.article.items);
    const [selectedTags, setSelectedTags] = useState([]);

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

    // Handler for selecting/deselecting a tag
    const handleTagSelection = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((id) => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };
    
    const filteredContent = blogItems.filter((content) => {
        if (selectedTags.length === 0) {
          return true; 
        }
        return selectedTags.some((tagId) => content?.tags?.includes(tagId));
    });

    return (
        <>
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
                {filteredContent && filteredContent.length !== 0 && filteredContent.map((item) => {
                    return (<BlogItem key={item.id} id={item.id} title={item.title} content={item.content} plaintext={item.plaintext} date={item.date} author={item.author} category={item.category}></BlogItem>);
                })
                }
            </div>
        </>

    );
}

export default Blogs;
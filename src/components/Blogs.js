import BlogItem from "./BlogItem";
import classes from './Blogs.module.css';
import { useSelector } from "react-redux";

const Blogs = () => {
    const blogItems = useSelector(state => state.article.items);
    return (
        <div className={classes.blogs}>
            {   blogItems.map((item) => {
                    return(<BlogItem key={item.id} id={item.id} title={item.title} content={item.content} plaintext={item.plaintext} date={item.date} author={item.author}></BlogItem>);
                })
            }
        </div>
    );
}

export default Blogs;
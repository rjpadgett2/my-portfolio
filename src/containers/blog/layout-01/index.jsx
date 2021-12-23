import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionTitle from "@components/section-title";
import BlogCard from "@components/blog-card/layout-01";
import { SectionTitleType, BlogType } from "@utils/types";
import sanityClient from "../../../client";

const BlogArea = ({ data, id }) => {

    const [postData, setPost] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "post"]{
              title,
                _id,
                startDate,
                endDate,
                slug,
                  mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    },
                body,
                "name" : author->name,
                "authorImage" : author->image
            }`
        ).then((data) => setPost(data))
            .catch(console.error);
    }, []);

    return (
        <div className="rn-blog-area rn-section-gap section-separator" id={id}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {data?.section_title && (
                            <SectionTitle
                                {...data.section_title}
                                align="center"
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="500"
                                data-aos-once="true"
                            />
                        )}
                    </div>
                </div>
                <div className="row row--25 mt--30 mt_md--10 mt_sm--10">
                {postData && postData.sort((a,b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1).map((post, index) => (
                        <div
                            key={post.slug.current}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="400"
                            data-aos-once="true"
                            className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 mt--30"
                        >
                            <BlogCard
                                title={post.title}
                                slug={post.slug.current}
                                image={post.mainImage}
                                startDate={post.startDate}
                                endDate={post.endDate}
                                content={post.body}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

BlogArea.propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
        section_title: PropTypes.shape(SectionTitleType),
        blogs: PropTypes.arrayOf(PropTypes.shape(BlogType)),
    }),
};

BlogArea.defaultProps = {
    id: "blog",
};

export default BlogArea;

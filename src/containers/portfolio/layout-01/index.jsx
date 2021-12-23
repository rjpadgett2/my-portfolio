import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SectionTitle from "@components/section-title";
import PortfolioCard from "@components/portfolio-card/layout-01";
import { ItemType, SectionTitleType } from "@utils/types";
import sanityClient from "../../../client";

const PortfolioArea = ({ data, id }) => {

    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "project"]{
                title,
                _id,
                body,
                githubLink,
                 slug,
                  mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    },
                appLink,
                tags
            }`
        ).then((data) => setProjectData(data))
            .catch(console.error);
    }, []);

    return (
        <div
            className="rn-portfolio-area rn-section-gap section-separator"
            id={id}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {data?.section_title && (
                            <SectionTitle
                                align="center"
                                {...data.section_title}
                            />
                        )}
                    </div>
                </div>

                <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
                    {projectData && projectData.map((project, index) => (
                        <div
                            key={project.slug.current}
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-once="true"
                            className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
                        >
                            <PortfolioCard
                                title={project.title}
                                slug={project.slug.current}
                                image={project.mainImage}
                                texts={project.body}
                                appLink={project.appLink}
                                githubLink={project.githubLink}
                                id={id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

PortfolioArea.propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
        section_title: PropTypes.shape(SectionTitleType),
        items: PropTypes.arrayOf(PropTypes.shape(ItemType)),
    }),
};

PortfolioArea.defaultProps = {
    id: "portfolio",
};

export default PortfolioArea;

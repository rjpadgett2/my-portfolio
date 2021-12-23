import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { X } from "react-feather";
import BlockContent from "@sanity/block-content-to-react";
import Image from "@ui/image";
import YouTube from 'react-youtube';
import imageUrlBuilder from "@sanity/image-url";
import getYouTubeId from 'get-youtube-id'
import { ImageType } from "@utils/types";
import Comment from "../comment";
import sanityClient from "../../client";

const blocksToHtml = require('@sanity/block-content-to-html')
const builder = imageUrlBuilder(sanityClient);
const client = require('@sanity/client')({
    projectId: 'tqrff0gd',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
})
// `h` is a way to build HTML known as hyperscript
// See https://github.com/hyperhype/hyperscript for more info
const h = blocksToHtml.h


const serializers = {
    types: {
        youtube: ({node}) => {
            const { url } = node
            const id = getYouTubeId(url)
            return (<YouTube videoId={id} />)
        },
        code: props => (
            h('pre', {className: props.node.language},
                h('code', props.node.code)
            )
        ),
    },
    marks: {
        link: ({mark, children}) => {
            const {slug = {}} = mark
            const href = `/${slug.current}`
            return <a href={href}>{children}</a>
        }
    }
}

const BlogModal = ({
    show,
    setShow,
    image,
    title,
    content,
    id,
    slug,
}) => {
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header>
                <Modal.Title
                    id="example-custom-modal-styling-title"
                    className="sr-only"
                >
                    Custom Modal Styling
                </Modal.Title>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShow(false)}
                >
                    <span aria-hidden="true">
                        <X />
                    </span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="news-details">
                    <h2 className="title">{title}</h2>
                    <BlockContent
                        blocks={content}
                        projectId="tqrff0gd"
                        dataset="production"
                        serializers={serializers}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

BlogModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    image: PropTypes.shape(ImageType).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default BlogModal;

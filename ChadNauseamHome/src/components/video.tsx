import React from "react"
const Video = ({ src }) => (
    <div className="shadowed-2">
        <video controls>
            <source src={src} type="video/mp4" />
        </video>
    </div>
)
export default Video
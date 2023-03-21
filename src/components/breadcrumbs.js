import * as React from "react"

const breadcrumbAreaStyles = {
    padding: "80px 0",
    backgroundColor: "#f4f5f7"
}

const Breadcrumbs = ({ title, breadcrumbs }) => {
    return (
        <section className="breadcrumbs" style={breadcrumbAreaStyles}>
            <div className="container">
                <h1 className="title">{title}</h1>
                <div className="breadcrumbs__links"></div>
            </div>
        </section>
    )
}

export default Breadcrumbs
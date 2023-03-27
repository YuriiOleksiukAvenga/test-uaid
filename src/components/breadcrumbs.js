import * as React from "react"
import styled from "styled-components"

const BreadcrumbsWrapper = styled.section`
  padding: 80px 0;
  background-color: #f4f5f7;
`

const ContainerWrapper = styled.div`
  max-width: 1170px;
  width: 100%;
  padding: 0 12px;
  margin: 0 auto;
`

const TitleWrapper = styled.h1`
  font-size: 36px;
  font-weight: 600;
`

const Breadcrumbs = ({ title, breadcrumbs }) => {
    return (
        <BreadcrumbsWrapper>
            <ContainerWrapper>
                <TitleWrapper>{title}</TitleWrapper>
            </ContainerWrapper>
        </BreadcrumbsWrapper>
    )
}

export default Breadcrumbs
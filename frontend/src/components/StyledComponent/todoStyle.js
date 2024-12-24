import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`
const MiddleSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 624px){
      flex-direction: column;
  }
`

export {
  Container,
  MiddleSectionWrapper
}
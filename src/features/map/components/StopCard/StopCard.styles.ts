import styled from 'styled-components'

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  width: 100%;
  padding: ${({ theme }) => theme.space(5, 4, 4)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => `${theme.radii.xl} ${theme.radii.xl} 0 0`};
  box-shadow: ${({ theme }) => theme.shadows.overlay};
`

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(3)};
`

export const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(2)};
`

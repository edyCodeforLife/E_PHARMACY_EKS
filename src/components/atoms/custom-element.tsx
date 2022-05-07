import styled from '@emotion/styled';
type ICustomFooterProps = {
	jcontent?: string;
}

export const ContainerGeneral = styled.div`
	box-sizing: border-box;
	position: relative;
	margin-left: auto;
	margin-right: auto;
		@media (max-width: 768px) {
			padding-left: 6px;
			padding-right: 6px;
			max-width: 960px;
		}
`;

export const CustomContainerGeneral = styled(ContainerGeneral)`
	position: relative !important;
`;

export const InsideContainer = styled.div`
    padding-top: 12px !important;
    min-height: 100vh !important;
    -moz-box-sizing: border-box !important;
    box-sizing: border-box !important;
    padding-bottom: 12px !important;
	&:before {
		content: "" !important;
		display: block !important;
		top: 0px !important;
		left: 0px !important;
		right: 0px !important;
		bottom: 0px !important;
		position: fixed !important;
  }
  	@media (max-width: 768px) {
		padding-top: 0px !important;
		padding-bottom: 0px !important;
	}
`;

export const CustomFlex = styled.div`
  	margin-left: -6px;
    margin-right: -6px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: normal;
`;

export const ContentContainer = styled.div`
  	box-sizing: border-box;
    min-height: 1px;
    position: relative;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    overflow: inherit;
    flex: 0 0 50%;
    max-width: 50%;
    margin-left: 25%;
    right: auto;
    left: auto;
	@media (max-width: 768px) {
		padding-left: 0px;
		padding-right: 0px;
		max-width: 100%;
		margin-left: 0px;
		flex: 0;
	}
`;

export const CustomHeader = styled.div`
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 60px;
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 15px;
	text-align: center;
`;

export const CustomFooter = styled.div<ICustomFooterProps>`
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 60px;
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	left: 0;
	right: 0;
    bottom: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 25px;
	background-color: #FFFFFF;
    justify-content: ${(props) => props.jcontent};
`;
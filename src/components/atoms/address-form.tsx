import { Fragment, memo } from "react"
import styled from "@emotion/styled";
import { FlexRow } from "./flex";
import { CustomText } from "./typography";
import TextField from "@mui/material/TextField";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import FormControl from '@mui/material/FormControl';
import { Autocomplete } from "@mui/material";
import { ICity, ICountry, IDistricts, IProvince, ISubDistricts } from "../../libs/services/location/ilocation-service";
import { makeStyles } from "@mui/styles";
import { IInitialStateValue } from "../../pages/address/insert/[cartId]";
import { LogoImage } from "./image";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export interface IFormAddressProps {
    data: any;
    GOOGLE_MAPS_API_KEY: string;
    locationData: any;
    errorMessage: IInitialStateValue;
    countryData: ICountry[];
    provinceData: IProvince[];
    cityData: ICity[];
    districtsData: IDistricts[];
    subDistrictsData: ISubDistricts[];
    gotoSetLocation(): void;
    onInput(field: string, value: any): void;
    onChange(field: string, value: any, error?: any): void;
    onChangeLocation(field: string,  value: any, id?: any): void;
}

const FormContainer = styled.div`
`

type ICustomFieldProps = {
    errorColor?: boolean;
}

type IPropsErrorMessage = {
    error: boolean;
}

export const CustomField = styled(TextField)<ICustomFieldProps>`
    background: #fff !important;
    border: 1px solid transparent;
    box-sizing: border-box !important;
    border-radius: 5px !important;
    color: #C7C9D9 !important;
    .MuiOutlinedInput-root {
        fieldset {
            border-color: #DDE5E9 !important;

        }
        &:hover fieldset {
            border-color: #DDE5E9 !important;
        }
        &.focused fieldset {
            // border-color: #3868B0 !important;
        }
        &.placeholder {
            font-size: 12px !important;
        }
    }
    .MuiInputBase-input-MuiOutlinedInput-input {
        padding: 12px 12px !important;
    }
    .MuiInputBase-input {
        padding: 12px 12px !important;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 0.5px solid #3868B0 !important;
    }
    .MuiInputLabel-outlined {
        color: #C7C9D9 !important;
    };
    .MuiFormLabel-root.Mui-focused {
        color: #61C7B5 !important;
    }

    .MuiFormLabel-root.Mui-error {
        color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
    }
    .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) => props.errorColor ? '#f44336' : '#61C7B5'} !important;
    }
`

const CustomFormControl = styled(FormControl)`
    padding: 9px 0;
    width: 100%;
`

const FlexColBetween = styled(FlexRow)`
    justify-content: space-between;
    padding: 12px 12px;
    border: 1px solid transparent;
    border-radius: 5px;
    border-color: #DDE5E9 !important;
    cursor: pointer;
`
const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 20px) scale(1);"
      }
    },
    inputRoot: {
      color: "tosca",
      padding: '0px !important',
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
        paddingLeft: 6
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "green"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple"
      }
    }
  }));

  export const ContainerErrorMessage = styled.div<IPropsErrorMessage>`
	padding: 3px;
	line-height: 17px;
	justify-content: flex-start;
	display: ${(props) => props.error ? "flex" : "none"};
`;

export const TextError = styled.span`
	color: red;
	font-size: 12px;
`;

function _InsertAddressForm(props: IFormAddressProps) {
    const { data, GOOGLE_MAPS_API_KEY, locationData, errorMessage, countryData, provinceData, cityData, districtsData, subDistrictsData, gotoSetLocation, onInput, onChange, onChangeLocation } = props;
    const customStyle = useStyles();
    
    return (
        <FormContainer>
            <CustomFormControl variant="standard">
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Nama Penerima</CustomText>
                <CustomField 
                    placeholder="Tulis nama penerima"
                    color="primary"
                    value={data && data.receiverName}
                    onChange={(e) => { e; onChange('receiverName', e.target.value); }}
                />
                <ContainerErrorMessage error={errorMessage && errorMessage["receiverName"] !== ""}>
                    <TextError>{errorMessage["receiverName"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl variant="standard">
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Nomor Ponsel</CustomText>
                <CustomField 
                    inputProps={{
                        maxLength: 14
                    }}
                    placeholder="Masukkan nomor penerima"
                    color="primary"
                    value={data && data.receiverPhone}
                    type="tel"
                    onChange={(e) => { e; onChange('receiverPhone', e.target.value); }}
                />
                <ContainerErrorMessage error={errorMessage && errorMessage["receiverPhone"] !== ""}>
                    <TextError>{errorMessage["receiverPhone"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl variant="standard">
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Pin Lokasi</CustomText>
                <div onClick={gotoSetLocation}>
                    { data.lat !== "" && data.lat !== null && data.lng !== "" && data.lng !== null ? (
                        <LogoImage src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.lat},+${data.lng}&zoom=15&scale=false&size=324x150&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x3e8cb9%7Clabel:%7C${data.lat},+${data.lng}`} 
                        width={"100%"} 
                        height={150} 
                        bradius={"5px"}
                        />
                    ) : (
                        <Fragment>
                            <FlexColBetween>
                                    <CustomText fsize={14} fweight={400} color="#61C7B5">Sematkan pin lokasi</CustomText>
                                    <ArrowForwardIos sx={{color: "#61C7B5"}} fontSize="small"/>
                            </FlexColBetween>
                           <ContainerErrorMessage error={errorMessage && errorMessage["lat"] !== "" || errorMessage["lng"] !== ""}>
                                <TextError>{errorMessage["lat"]}</TextError>
                            </ContainerErrorMessage> 
                        </Fragment>
                    )}
                </div>
            </CustomFormControl>

            <CustomFormControl variant="standard">
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Masukkan Alamat</CustomText>
                <CustomField
                    placeholder="Masukkan nama jalan, blok, nomor rumah"
                    color="primary"
                    value={data && data.street}
                    onChange={(e) => { e; onChange('street', e.target.value); }}
                />
                <ContainerErrorMessage error={errorMessage && errorMessage["street"] !== ""}>
                    <TextError>{errorMessage["street"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Negara</CustomText>
                {/* <Autocomplete
                    classes={customStyle}
                    sx={{height: "47px", textAlign: "left", fontSize: "14px", color: "#6B7588"}}
                    disablePortal
                    options={countryData}
                    // options={countryData.map((item: any, idx: any) => {return item.name})}
                    getOptionLabel={(option: ICountry) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(e: any, option: ICountry | null) => {
                        onChangeLocation('country', option, option?.country_id);
                        onChange('country', option?.country_id ? option?.country_id : '');
                    }}
                    value={locationData.country}
                    onInput={(e) => onInput('country', e)}
                    renderInput={(params) => <CustomField {...params} placeholder="ID-Indonesia" color="primary"/>}
                /> */}
                <Select
                    color="primary"
                    displayEmpty
                    value={data.country}
                    onChange={(e: any, item: any) => {
                        onChangeLocation('country', {country_id: item.props.value, name: item.props.children}, e.target.value);
                        onChange('country', e.target.value ? e.target.value : '');
                    }}
                >
                    <MenuItem disabled value="">
                        ID-Indonesia
                    </MenuItem>
                    {countryData.map((item: ICountry, idx: number) => (
                        <MenuItem key={idx} value={item?.country_id}>{item?.name}</MenuItem>
                    ))}
                </Select>
                <ContainerErrorMessage error={errorMessage && errorMessage["country"] !== ""}>
                    <TextError>{errorMessage["country"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>
            
            

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Provinsi</CustomText>
                {/* <Autocomplete
                    classes={customStyle}
                    sx={{height: "47px", textAlign: "left", fontSize: "14px", color: "#6B7588"}}
                    options={provinceData}
                    getOptionLabel={(option: IProvince) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(e: any, option: IProvince | null) => {
                        onChangeLocation('province', option);
                        onChange('province', option?.province_id ? option?.province_id : '');
                    }}
                    value={locationData.province}
                    renderInput={(params) => <CustomField {...params} placeholder="Pilih Provinsi" color="primary" />}
                /> */}

                <Select
                    color="primary"
                    displayEmpty
                    value={data.province}
                    onChange={(e: any, item: any) => {
                        onChangeLocation('province', {province_id: item.props.value, name: item.props.children}, e.target.value);
                        onChange('province', e.target.value ? e.target.value : '');
                    }}
                >
                    <MenuItem disabled value="">
                        Pilih Provinsi
                    </MenuItem>
                    {provinceData.map((item: IProvince, idx: number) => (
                        <MenuItem key={idx} value={item?.province_id}>{item?.name}</MenuItem>
                    ))}
                </Select>
                <ContainerErrorMessage error={errorMessage && errorMessage["province"] !== ""}>
                    <TextError>{errorMessage["province"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Kota</CustomText>
                {/* <Autocomplete
                    classes={customStyle}
                    sx={{height: "47px", textAlign: "left", fontSize: "14px", color: "#6B7588"}}
                    disablePortal
                    options={cityData}
                    getOptionLabel={(option: ICity) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(e: any, option: ICity | null) => {
                        onChangeLocation('city', option);
                        onChange('city', option?.city_id ? option?.city_id : '');
                    }}
                    value={locationData.city}
                    renderInput={(params) => <CustomField {...params} placeholder="Pilih Kota" color="primary" />}
                /> */}

                <Select
                    color="primary"
                    displayEmpty
                    value={data.city}
                    onChange={(e: any, item: any) => {
                        onChangeLocation('city', {city_id: item.props.value, name: item.props.children}, e.target.value);
                        onChange('city', e.target.value ? e.target.value : '');
                    }}
                >
                    <MenuItem disabled value="">
                        Pilih Kota
                    </MenuItem>
                    {cityData.map((item: ICity, idx: number) => (
                        <MenuItem key={idx} value={item?.city_id}>{item?.name}</MenuItem>
                    ))}
                </Select>
                <ContainerErrorMessage error={errorMessage && errorMessage["city"] !== ""}>
                    <TextError>{errorMessage["city"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Kecamatan</CustomText>
                {/* <Autocomplete
                    classes={customStyle}
                    sx={{height: "47px", textAlign: "left", fontSize: "14px", color: "#6B7588"}}
                    disablePortal
                    options={districtsData}
                    getOptionLabel={(option: IDistricts) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(e: any, option: IDistricts | null) => {
                        onChangeLocation('district', option)
                        onChange('district', option?.district_id ? option?.district_id : '');
                    }}
                    value={locationData.district}
                    renderInput={(params) => <CustomField {...params} placeholder="Pilih Kecamatan" color="primary" />}
                /> */}

                <Select
                    color="primary"
                    displayEmpty
                    value={data.district}
                    onChange={(e: any, item: any) => {
                        onChangeLocation('district', {district_id: item.props.value, name: item.props.children}, e.target.value);
                        onChange('district', e.target.value ? e.target.value : '');
                    }}
                >
                    <MenuItem disabled value="">
                        Pilih Kecamatan
                    </MenuItem>
                    {districtsData.map((item: IDistricts, idx: number) => (
                        <MenuItem key={idx} value={item?.district_id}>{item?.name}</MenuItem>
                    ))}
                </Select>
                <ContainerErrorMessage error={errorMessage && errorMessage["district"] !== ""}>
                    <TextError>{errorMessage["district"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">Kelurahan</CustomText>
                {/* <Autocomplete
                    classes={customStyle}
                    sx={{height: "47px", textAlign: "left", fontSize: "14px", color: "#6B7588"}}
                    disablePortal
                    options={subDistrictsData}
                    getOptionLabel={(option: ISubDistricts) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    onChange={(e: any, option: ISubDistricts | null) => {
                        onChangeLocation('sub_district', option)
                        onChange('sub_district', option?.sub_district_id ? option?.sub_district_id : '');
                    }}
                    value={locationData.sub_district}
                    renderInput={(params) => <CustomField {...params} placeholder="Pilih Kelurahan" color="primary" />}
                /> */}

                <Select
                    color="primary"
                    displayEmpty
                    value={data.sub_district}
                    onChange={(e: any, item: any) => {
                        onChangeLocation('sub_district', {sub_district_id: item.props.value, name: item.props.children}, e.target.value);
                        onChange('sub_district', e.target.value ? e.target.value : '');
                    }}
                >
                    <MenuItem disabled value="">
                        Pilih Kelurahan
                    </MenuItem>
                    {subDistrictsData.map((item: ISubDistricts, idx: number) => (
                        <MenuItem key={idx} value={item?.sub_district_id}>{item?.name}</MenuItem>
                    ))}
                </Select>
                <ContainerErrorMessage error={errorMessage && errorMessage["sub_district"] !== ""}>
                    <TextError>{errorMessage["sub_district"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>

            <CustomFormControl>
                <CustomText fsize={14} fweight={600} color="#6B7588" talign="left" margin="0 0 8px 0">RT/RW</CustomText>
                <CustomField 
                    placeholder="Masukkan RT/RW" 
                    color="primary" 
                    value={data && data.rt_rw}
                    onChange={(e) => { e; onChange('rt_rw', e.target.value); }}
                />
                <ContainerErrorMessage error={errorMessage && errorMessage["rt_rw"] !== ""}>
                    <TextError>{errorMessage["rt_rw"]}</TextError>
                </ContainerErrorMessage>
            </CustomFormControl>
        </FormContainer>
    )
}

export const InsertAddressForm = memo(_InsertAddressForm);
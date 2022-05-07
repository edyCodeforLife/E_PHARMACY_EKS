import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../libs/variables';
import { CustomFooter } from '../atoms/custom-element';
import { CustomText } from '../atoms/typography';
import { SearchInput } from '../atoms/search';
import { InfoLabel } from '../atoms/info';
import { BasicBtn } from '../atoms/button';
import { FlexOne } from '../atoms/flex';
import { useGlobalState } from '../../libs/states';

interface IMapProps {
    _addressId: any;
    getLatLng(latLng: any): void;
    getAddress(formmated_address: string): void;
    onSaveAddress(): void;
}

type IDivProps = {
    padding?: string;
}

const libraries: any = ['places'];


const containerStyle = {
    width: '100%',
    height: '500px'
};

const CustomButton = {
    fontSize: 14,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    width: '100%',
    borderRadius: 20,
}

const InputCard = styled(CustomFooter)`
    min-height: 300px;
    border-radius: 20px 20px 0px 0px;
    justify-content: space-between;
    flex-direction: column;
    padding: 18px 0;
`
const Div = styled.div<IDivProps>`
    width: 100%;
    padding: ${(props) => props.padding};
`

const ContainerInside = styled(FlexOne)`
    // margin-top: 60px;
    height: calc(100vh - 180px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    // overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh - 60px);
    };
`;

function _Map(props: IMapProps) {
    const { _addressId, getLatLng, getAddress, onSaveAddress } = props;

    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

	const [_state, dispatch] = useGlobalState();
    const [map, setMap] = useState(null);
    const [latLng, setLatLng] = useState({ lat: -6.2087634, lng: 106.845599 });
    const [formatted_address, setFormatted_address] = useState<any>(null)
    const [bounds, setBounds] = useState<any>(null);
    const [search, setSearch] = useState<any>(null);

    const geoCoder = (property: string, value: any) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(property == 'location' ? { 'location': value } : { 'placeId': value }, (results, status) => {
            if (status === 'OK') {
                setFormatted_address(results?.[0].formatted_address)
            }
        })
    }

    const getCurrentLocation = () => {
        window.navigator?.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                const pos = { lat, lng };
                setLatLng(pos);
            }
        );
    }

    const onMapLoad = useCallback(function callback(map) {
        const latlngValue = _state.user.location_user.latLong;
        if (latlngValue) {
            if (latlngValue.lat !== null && latlngValue.lat !== "" && latlngValue.lng !== null && latlngValue.lng !== "") {
                setLatLng({
                    lat: parseFloat(latlngValue.lat),
                    lng: parseFloat(latlngValue.lng)
                });
            } else {
                getCurrentLocation();
            }
        } else {
            getCurrentLocation();
        }

        window.google.maps.event.addListener(map, "bounds_changed", () => {
            setBounds(map.getBounds());
        });
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onMapClick = (e: any) => {
        const { placeId } = e;
        setLatLng({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        geoCoder('placeId', placeId);
    }

    const onPositionChange = (e: any) => {
        setLatLng({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        geoCoder('location', e.latLng);
    }

    const onPlacesChanged = () => {
        const result = search?.getPlaces();
        setLatLng({
            lat: result[0].geometry.location.lat(),
            lng: result[0].geometry.location.lng()
        })
        geoCoder('placeId', result[0].place_id);
    }

    const onSBLoad = (ref: any) => {
        setSearch(ref);
    };

    useEffect(() => {
        isLoaded && formatted_address == null && geoCoder('location', latLng);

        getLatLng(latLng);
        getAddress(formatted_address);
    }, [latLng, formatted_address]);

    return isLoaded ? (
        <Fragment>
            <ContainerInside>

                <GoogleMap
                    id='google-map-script'
                    mapContainerStyle={containerStyle}
                    center={latLng}
                    zoom={15}
                    onLoad={onMapLoad}
                    onUnmount={onUnmount}
                    options={{ disableDefaultUI: true }}
                    onClick={onMapClick}
                >

                    <Marker
                        // onLoad={onLoad}
                        icon={'/static/icons/marker-icon.svg'}
                        draggable={true}
                        position={latLng}
                        onDragEnd={onPositionChange}
                    />
                </GoogleMap>
            </ContainerInside>
            <InputCard>
                <Div padding='0 18px 18px 18px'>
                    <StandaloneSearchBox onLoad={onSBLoad} onPlacesChanged={onPlacesChanged}>

                        <SearchInput
                            id="search-input"
                            needIcon={true}
                            isActiveClick={false}
                            width={"100%"}
                            maxWidth='100%'
                            placeholder='Cari Alamat'
                            onKeyPress={(e: any) => { e.key === "Enter" && e.preventDefault() }}
                        />
                    </StandaloneSearchBox>

                    <CustomText fsize={14} fweight={600} talign='left' margin='18px 0 5px 0'>{formatted_address}</CustomText>
                    {/* <CustomText fsize={14} fweight={400} color="#8F90A6" talign='left' margin='0 0 1.5px 0'>{formatted_address}</CustomText> */}
                    <CustomText fsize={14} fweight={400} color="#3868B0" talign='left'>{latLng.lat}, {latLng.lng}</CustomText>
                </Div>

                <Div>
                    <InfoLabel
                        background={"#D6EDF6"}
                        color={"#2C528B"}
                        fontSize={12}
                        fontWeight={500}
                        padding={"25px 20px"}
                    >
                        <CustomText fsize={12} fweight={700} talign='center'>Mohon letakan pin dengan akurat</CustomText>
                        <CustomText fsize={12} fweight={400} talign='center'>Untuk pengiriman ke alamat yang tepat</CustomText>
                    </InfoLabel>
                    <Div padding='18px 18px 0 18px'>
                        <BasicBtn style={CustomButton} bColor={"#61C7B5"} onClick={onSaveAddress}>
                            Pilih Alamat
                        </BasicBtn>
                    </Div>
                </Div>
            </InputCard>
        </Fragment>
    ) : <></>
}

export const MapContent = memo(_Map);

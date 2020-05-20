
export const getAreaDetails = async () => {
    const response = await fetch("https://vrad-api.herokuapp.com/api/v1/areas");
    const areaDetails = await response.json();
    return getAreaListings(areaDetails);
}

const getAreaListings = async (areaDetails) => {
    const areaNamePromises = await areaDetails.areas.map((area) => {
        return getAreaPromises(area);
    })
    return Promise.all(areaNamePromises)
}

const getAreaPromises = async (areaListData) => {
    const areaResponse = await fetch(`https://vrad-api.herokuapp.com${areaListData.details}`);
    const areaData = await areaResponse.json();
    areaData.shortName = areaListData.area;
    return areaData
}

export const getListingData = async (listingURL) => {
    const response = await fetch(`https://vrad-api.herokuapp.com${listingURL}`);
    const data = await response.json();
    return data
}

export const getListingDetails =  async (listingURL) => {
    const response = await fetch(`https://vrad-api.herokuapp.com/api/v1/listings/${listingURL}`)
    const data = await response.json();
    return data
}
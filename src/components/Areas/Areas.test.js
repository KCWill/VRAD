import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App.js'
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { getAreaDetails } from '../../apiCalls.js';
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
jest.mock('../../apiCalls.js');

describe('Areas', () => {

  it('should be able to see the areas of Denver upon sign in', async () => {
    const areasData = [
            {
              id: 590,
              name: "River North",
              location: "North of Downtown Denver",
              about: "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
              region_code: 6356834,
              quick_search: "o5kod9f5cqo0",
              listings: [
                '/api/v1/listings/3',
                '/api/v1/listings/44',
                '/api/v1/listings/221',
                '/api/v1/listings/744',
                '/api/v1/listings/90',
                '/api/v1/listings/310',
              ],
              shortName:'RiNo'
            },
            {
              id: 751,
              name: "Park Hill",
              location: "East of Downtown Denver",
              about: "Park Hill features one of the best views of the downtown area and surrounding mountains. With easy access to City Park and the major highways, Park Hill also includes many unique styles of homes.",
              region_code: 6648386,
              quick_search: "g1m0tsxzl0o0",
              listings: [
                '/api/v1/listings/3921',
                '/api/v1/listings/56',
                '/api/v1/listings/21',
              ],
              shortName:'Park Hill'
            },
            {
              id: 408,
              name: "Lower Highlands",
              location: "West of Downtown",
              about: "The Lower Highlands area, often referred to as the Highlands or LoHi, was one of the first areas to experience massive growth from the downtown area. Known for many great bars and restaurants with a great eastern facing view of the Downtown area.",
              region_code: 640399,
              quick_search: "17klwudb1h340",
              listings: [
                '/api/v1/listings/83331',
                '/api/v1/listings/411',
                '/api/v1/listings/92',
                '/api/v1/listings/6135',
                '/api/v1/listings/9',
                '/api/v1/listings/11',
                '/api/v1/listings/77'
              ],
              shortName:'LoHi'
            },
            {
              id: 240,
              name: "Capitol Hill",
              location: "Southwest of Downtown",
              about: "Capitol Hill is home to many historic homes and parks in the Denver area. Cap Hill offers great proximity to Downtown area and has many options for enjoying the wonderful weather in Denver.",
              region_code: 6035251,
              quick_search: "2mxzlp185o800",
              listings: [
                '/api/v1/listings/66',
                '/api/v1/listings/555',
                '/api/v1/listings/27',  
                '/api/v1/listings/8',
              ],
              shortName:'Cap Hill'
            }
          ];
    getAreaDetails.mockResolvedValueOnce(areasData);
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Léah'}});
    fireEvent.change(getByPlaceholderText('Email'), {target: {value: 'test@test.com'}});
    fireEvent.change(getByDisplayValue('Vacation'), {target: {value: 'Vacation'}});
    fireEvent.click(getByText('Sign In!'));
    const areaTitle = await waitFor( () => getByText('River North (RiNo)'))
    expect(areaTitle).toBeInTheDocument();
  })
})

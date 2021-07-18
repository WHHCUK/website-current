import React from 'react';

interface Props {
  link: string;
}

const CityMapperLink: React.FC<Props> = ({ link }) => (
  <a href={link} target="_blank">
    <img
      src="https://static.citymapper.com/img/embed/GetMeThere_Citymapper.png"
      alt="Get directions with Citymapper"
    />
  </a>
);

export default CityMapperLink;

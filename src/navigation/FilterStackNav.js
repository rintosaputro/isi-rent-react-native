import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchList from '../screens/SearchList';
import Filter from '../screens/Filter';

const FilterStack = createNativeStackNavigator();

const FilterStackNav = () => {
  return (
    <FilterStack.Navigator>
      <FilterStack.Screen name="SearchList" component={SearchList} />
      <FilterStack.Screen name="Filter" component={Filter} />
    </FilterStack.Navigator>
  );
};

export default FilterStackNav;

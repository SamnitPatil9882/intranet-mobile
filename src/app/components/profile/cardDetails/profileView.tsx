import React from 'react';
import {View, StyleSheet} from 'react-native';

import CircleView from '../../views/circleView';

import urlHandler from '../../../utils/userProfile/urlHandler';

import {socialDetailsType} from '../../../types';

const handlePress = (uri: string) => urlHandler(uri);

type Props = {
  data: socialDetailsType;
};

const ProfileView = ({data}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <View style={styles.profileContainer}>
      {dataArray.map(([name, uri], index) => {
        if (name == 'github') {
          uri = `https://github.com/${uri}`;
        }
        return uri ? (
          <CircleView
            key={index}
            data={{name: name}}
            uri={uri}
            handlePress={handlePress}
          />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});
export default ProfileView;

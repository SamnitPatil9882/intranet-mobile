import {useMutation} from 'react-query';
import {
  postReward,
  postObjection,
} from '../../../services/PeerlyServices/appreciationDetails';
import toast from '../../../utils/toast';
import {AxiosError} from 'axios';
import {APIError} from '../types';
import {
  PostObjectionRequest,
  PostRewardRequest,
} from '../../../services/PeerlyServices/appreciationDetails/types';

export function usePostReward() {
  return useMutation({
    mutationKey: ['post_reward'],
    mutationFn: (payload: PostRewardRequest) => postReward(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving reward', 'error');
      }
    },
  });
}

export function usePostObjection() {
  return useMutation({
    mutationKey: ['post_objection'],
    mutationFn: (payload: PostObjectionRequest) => postObjection(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving objection', 'error');
      }
    },
  });
}

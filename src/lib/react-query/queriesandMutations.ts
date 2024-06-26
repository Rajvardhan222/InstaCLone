import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import authservice from "../appwrite/user";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => authservice.createNewAccount(user),
    onError: (error: Error) => {
      // Handle the error here
      console.error("An error occurred while creating user account:", error);
      // You can also show an error message to the user, or perform any other actions as needed
      return error;
    },
  });
};

export const useSignInUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      authservice.singIn(user),
  });
};

export const useSignOutUserAccountMutation = () => {
  return useMutation({
    mutationFn: () => authservice.singout(),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => authservice.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: authservice.getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
      //lastPage);
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, likesArray }) => {
      authservice.likePost(postId, likesArray);
      //likesArray);
      //postId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, UserId }) => authservice.savePost(postId, UserId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeletePOst = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedRecordId) => authservice.deleteSavePost(savedRecordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => authservice.getCurrentUser(),
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => authservice.getPostbyId(postId),
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => authservice.updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: authservice.getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
      //lastPage);
    },
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => authservice.searchPost(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetSavedPosts = (id: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SAVED_POSTS],
    queryFn: ({ pageParam }) =>
      authservice.getInfiniteSavePosts({ id: id, pageParam: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
      //lastPage);
    },
  });
};

export const useGetInfinityUser = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USER],
    queryFn: authservice.getInfiniteUser,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
      //lastPage);
    },
  });
};

export const useGetInfinityUserSearch = (id: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USER_SEARCH, id],
    queryFn: ({ pageParam }) => {
      //pageParam);

      return authservice.getInfiniteUserResult({
        id: id,
        pageParam: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;
      //lastId);
      return lastId;
    },
  });
};

export const useGetUserPosts = (id: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS_UPLOADED],
    queryFn: ({ pageParam }) =>
      authservice.getInfinitePostsOfUserOnly({ id: id, pageParam: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
      //lastPage);
    },
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER_BY_ID, id],
    queryFn: () => authservice.getUserById(id),
  });
};

export const useUpdatePostFollowing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ removeMeFollow, mydetail, meFollowingCnt }) =>
      authservice.removeMeFollowing(removeMeFollow, mydetail, meFollowingCnt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_BY_ID, data.$id],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USER],
      });
    },
  });
};

export const useUpdatePostMeFollowing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newFollowerMe, mydetail, meFollowingCnt }) =>
      authservice.addMeFollowing(newFollowerMe, mydetail, meFollowingCnt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_BY_ID, data.$id],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USER],
      });
    },
  });
};

export const useUpdateRemoveFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newFollower, ids, FollowerCnt }) =>
      authservice.removeFollowers(newFollower, ids, FollowerCnt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_BY_ID, data.$id],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USER],
      });
    },
  });
};

export const useUpdateAddFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newFollower, ids, FollowerCnt }) =>
      authservice.addFollowers(newFollower, ids, FollowerCnt),
    onSuccess: (data) => {
      //data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_BY_ID, data.$id],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USER],
      });
    },
  });
};

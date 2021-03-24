import { CommentThread } from "components/ads/Comments/CommentsInterfaces";
import { ReduxAction } from "constants/ReduxActionConstants";
import { get } from "lodash";
import { CommentsReduxState } from "./interfaces";

const handleUpdateCommentThreadEvent = (
  state: CommentsReduxState,
  action: ReduxAction<Partial<CommentThread & { _id: string }>>,
) => {
  const id = action.payload._id!;
  const commentThreadInStore = state.commentThreadsMap[id];
  const existingComments = get(commentThreadInStore, "comments", []);

  return {
    ...state,
    commentThreadsMap: {
      ...state.commentThreadsMap,
      [id]: {
        ...commentThreadInStore,
        ...action.payload,
        comments: existingComments,
      },
    },
    creatingNewThreadComment: false,
  };
};

export default handleUpdateCommentThreadEvent;

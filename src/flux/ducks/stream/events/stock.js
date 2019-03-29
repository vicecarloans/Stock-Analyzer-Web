import { eventChannel } from "redux-saga";
import {
  TOKEN_STREAM,
  BASE_URL,
  getIntradayDataByStock
} from "constants/iextrading";
import Axios from "axios";
//Streaming Stock Data

export const createQuoteStreamChannel = stock =>
  eventChannel(emit => {
    const source = setInterval(async () => {
      const { data } = await Axios.get(
        `${BASE_URL}${getIntradayDataByStock({
          stock
        })}?token=${TOKEN_STREAM}`
      );
      emit({ data, cancellationToken: source });
    }, 60000);

    return () => {
      source.close();
    };
  });

// Close Streaming

export const disconnectQuoteStream = cancellationToken => {
  return new Promise(resolve => {
    clearInterval(cancellationToken);
    resolve("Closing Stream For Quote");
  });
};

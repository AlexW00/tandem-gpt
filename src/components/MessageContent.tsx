import { Message } from "../store/AppModel";

export const MessageContent = ({
    message,
}: {
    message: Message;
}) => {

    const getMessageParts = (message: Message) => {
        // returns the message.content as an array, containing the text and the annotations
        // e.g. "abc ab ab" -> ["abc", "ab", "ab"] if an annotation for "ab" exists

        const parts = [];

        console.log(message);

        const splits = message.annotations?.rating?.map((annotation: any) => {
            return {
                start: annotation.start,
                end: annotation.end,
                rating: annotation.highlight,
                correction: annotation.correction
            };
        }) ?? [];


        if (splits.length === 0) {
            parts.push({message: message.message});
        } else {
            let last = 0;
            
            splits.forEach((split: any) => {
                parts.push({
                    message: message.message?.slice(last, split.start),
                    rating: null
                });
                parts.push({
                    message: message.message?.slice(split.start, split.end),
                    rating: split.rating,
                    correction: split.correction
                });
                last = split.end;
            });

            if (message.message?.length !== undefined && last < message.message.length) {
                parts.push({
                    message: message.message?.slice(last),
                    rating: null
                });
            }
        }

        return parts;
    };

    // this component displays 
    // 1. the text of the message
    // 2. the annotations of the message; each annotation has a start and end index, and a rating
    // -> color the text based on the rating of the annotation


    return (
        <>
            {getMessageParts(message).map((part, index) => {
                return (
                    <span
                        key={index}
                        style={{
                            color: (!!part.rating && part.rating !== "green") ? part.rating : "black",
                        }}
                        // show message as tooltip
                        title={part.correction ? "Correction: " + part.correction : ""}
                    >
                        {part.message}
                    </span>
                );
            })}
        </>
    );
}
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Book } from "../bookMeta";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const ItemType = {
  BOOK: "book",
};

const DraggableBook = ({
  item,
  index,
  moveBook,
}: {
  item: string;
  index: number;
  moveBook: (fromIndex: number, toIndex: number) => void;
}) => {
  const [, dragRef] = useDrag({
    type: ItemType.BOOK,
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType.BOOK,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveBook(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const ref = useMemo(
    () => (node: HTMLSpanElement | null) => {
      dragRef(dropRef(node));
    },
    [dragRef, dropRef],
  );

  return (
    <span
      ref={ref}
      className="p-2 hover:bg-gray-100 outline outline-1 outline-gray-200 shrink-0"
    >
      {item}
    </span>
  );
};

export const BookOrderInput = ({
  bookOrder,
  setBookOrder,
}: {
  bookOrder: Book[];
  setBookOrder: (bookOrder: Book[]) => void;
}) => {
  const t = useTranslations("app.apps.bible-reading-calendar");
  const isTouchDevice = window.innerWidth < 768;
  const backend = isTouchDevice ? TouchBackend : HTML5Backend;

  const moveBook = (fromIndex: number, toIndex: number) => {
    const updatedOrder = [...bookOrder];
    const [movedBook] = updatedOrder.splice(fromIndex, 1);
    updatedOrder.splice(toIndex, 0, movedBook);
    setBookOrder(updatedOrder);
  };

  return (
    <div className="flex flex-col w-full">
      <p>{isTouchDevice ? t("instruction-touch") : t("instruction")}</p>
      <DndProvider backend={backend}>
        <div className="outline outline-1 outline-gray-200 rounded-md p-2 flex flex-wrap">
          {bookOrder.map((item, index) => (
            <DraggableBook
              key={item}
              item={t(`book.${item}`)}
              index={index}
              moveBook={moveBook}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

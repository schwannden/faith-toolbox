import { Reorder } from "motion/react";
import { Book } from "../bookMeta";
import { useTranslations } from "next-intl";

export const BookOrderInput = ({
  bookOrder,
  setBookOrder,
}: {
  bookOrder: Book[];
  setBookOrder: (bookOrder: Book[]) => void;
}) => {
  const t = useTranslations('app.apps.bible-reading-calendar');
  return (
    <div className="flex flex-col w-full">
      <p>{t('instruction')}</p>
      <Reorder.Group
        axis="x"
        layoutScroll
        style={{ overflowX: "scroll" }}
        values={bookOrder}
        onReorder={setBookOrder}
        className="outline outline-1 outline-gray-200 rounded-md p-2"
      >
        {bookOrder.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            as="span"
            className="p-2 hover:bg-gray-100"
          >
            {t(`book.${item}`)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

import { Button, Stack, TextInput } from "@mantine/core";
import { FC, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllText, updateText } from "src/store/features/textSlice";

type TextForm = {
  firstText: string;
};

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const texts = useSelector(selectAllText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateText({ firstText: e.target.value }));
  };

  const fetcher = async () => {
    const formData: TextForm = {
      firstText: texts.firstText,
    };
    const res = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return res;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetcher().then(async (res) => {
      // FIXME:
      console.info(await res.json());
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput onChange={handleChange} />
        <Button type="submit">Render!!!!!</Button>
      </Stack>
    </form>
  );
};

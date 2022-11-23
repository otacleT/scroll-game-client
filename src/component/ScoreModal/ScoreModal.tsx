import { Modal } from "@mantine/core";
import { FC, useCallback } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  sendMessage: (
    gameObjectName: string,
    methodName: string,
    parameter?: any
  ) => void;
  isLoaded: boolean;
};

export const ScoreModal: FC<Props> = (props) => {
  const { open, setOpen, score, sendMessage, isLoaded } = props;

  const handleRestart = useCallback(() => {
    sendMessage("ScrollController", "Restart");
    setOpen(false);
  }, [isLoaded]);
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      centered
      withCloseButton={false}
    >
      <h3 className="text-xl font-bold">Your score</h3>
      <p className="text-5xl font-bold text-center pt-10">
        {score}
        <span className="text-base pl-2">points</span>
      </p>
      <button
        className="text-sm leading-none cursor-pointer font-bold text-white bg-black py-4 px-5 mx-auto mt-10 rounded-md block w-full"
        onClick={handleRestart}
      >
        Play again
      </button>
    </Modal>
  );
};

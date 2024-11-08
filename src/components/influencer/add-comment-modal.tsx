import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import ButtonSpinner from "../common/button-spinner";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  commentModal: boolean;
  modalCloseHandler: () => void;
  form: any;
  textareaRef: any;
  postCommentHandler: () => void;
  proposalMsg: string;
  setProposalMsg: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

const AddCommentModal = ({
  commentModal,
  modalCloseHandler,
  form,
  textareaRef,
  postCommentHandler,
  proposalMsg,
  setProposalMsg,
  loading,
}: IProps) => {
  return (
    <>
      {" "}
      <Modal
        centered
        forceRender={true}
        destroyOnClose={false}
        open={commentModal}
        onOk={() => modalCloseHandler()}
        onCancel={() => {
          modalCloseHandler();
        }}
        className="w-full border border-grey max-lg-hidden common-modal modal-bottom rounded-18"
        width={700}
      >
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex p-5 gap-5 w-full rounded-18">
            <div className="flex w-full justify-center items-center flex-col gap-1.5">
              <div className="w-full flex flex-row justify-center items-center">
                <h1 className="sm:text-2xl text-xl font-semibold text-white">
                  {" "}
                  Add Comment
                </h1>
              </div>
              <div className="w-full">
                <Form
                  form={form}
                  autoComplete="off"
                  onFinish={() => postCommentHandler()}
                >
                  <Form.Item
                    name="comment"
                    className=" border-0 w-full"
                    validateTrigger={["onBlur", "onChange"]}
                    rules={[
                      {
                        required: true,
                        message: "Comment is required",
                      },
                      {
                        pattern: /^(?!\s+$).*$/,
                        message: "Blank spaces are not allowed!",
                      },
                      {
                        min: 3,
                        message: "Comment must be greater then 3 Character!",
                      },
                      {
                        max: 1000,
                        message: "Comment must be less then 1000 Character!",
                      },
                    ]}
                  >
                    <div className="flex gap-2 w-full  justify-center items-center">
                      <div className="w-full rounded-3 border-1 !border-purple max-md:block">
                        <TextArea
                          autoFocus={true}
                          ref={textareaRef}
                          rows={4}
                          placeholder="Write a comment.."
                          className="textarea-placeholder p-3 !shadow-none !resize-none text-base font-normal !bg-transparent !text-blue border-none border-b-8"
                          onChange={(e) => setProposalMsg(e?.target?.value)}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <div>
                    <div className="w-full flex flex-col justify-start item-start">
                      <p className="text-white text-base">Note:</p>
                      <p className="font-normal text-blue w-full text-base flex flex-col justify-start item-start">
                        10 influstar will be deducted from your account to post
                        comment.
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!proposalMsg || loading ? true : false}
                    className="mt-5 mb-5 w-full h-11 border-primary rounded-4xl rounded-1 font-semibold text-black bg-white text-base hover:shadow-custom-white"
                  >
                    <ButtonSpinner loading={loading} />
                    Post
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCommentModal;

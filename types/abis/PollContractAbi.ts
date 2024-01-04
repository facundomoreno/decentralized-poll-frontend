/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace PollContract {
  export type OptionStruct = {
    optionId: BigNumberish;
    pollId: BigNumberish;
    numberOfVotes: BigNumberish;
    name: string;
  };

  export type OptionStructOutput = [
    optionId: bigint,
    pollId: bigint,
    numberOfVotes: bigint,
    name: string
  ] & { optionId: bigint; pollId: bigint; numberOfVotes: bigint; name: string };

  export type VoteStruct = {
    voteId: BigNumberish;
    pollId: BigNumberish;
    voter: AddressLike;
    optionsVoted: PollContract.OptionStruct[];
  };

  export type VoteStructOutput = [
    voteId: bigint,
    pollId: bigint,
    voter: string,
    optionsVoted: PollContract.OptionStructOutput[]
  ] & {
    voteId: bigint;
    pollId: bigint;
    voter: string;
    optionsVoted: PollContract.OptionStructOutput[];
  };

  export type PollStruct = {
    id: BigNumberish;
    name: string;
    description: string;
    allowMultipleOptionsSelected: boolean;
    createdAt: BigNumberish;
    closesAt: BigNumberish;
    creator: AddressLike;
    numberOfOptions: BigNumberish;
  };

  export type PollStructOutput = [
    id: bigint,
    name: string,
    description: string,
    allowMultipleOptionsSelected: boolean,
    createdAt: bigint,
    closesAt: bigint,
    creator: string,
    numberOfOptions: bigint
  ] & {
    id: bigint;
    name: string;
    description: string;
    allowMultipleOptionsSelected: boolean;
    createdAt: bigint;
    closesAt: bigint;
    creator: string;
    numberOfOptions: bigint;
  };
}

export interface PollContractAbiInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createPoll"
      | "getMyVoteInPoll"
      | "getPollById"
      | "getPollVotes"
      | "getPolls"
      | "getPollsCount"
      | "votePoll"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "NewVoteInPoll" | "PollCreated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createPoll",
    values: [string, string, boolean, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getMyVoteInPoll",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPollById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPollVotes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPolls", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPollsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "votePoll",
    values: [BigNumberish, BigNumberish[]]
  ): string;

  decodeFunctionResult(functionFragment: "createPoll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMyVoteInPoll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPollById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPollVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPolls", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPollsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "votePoll", data: BytesLike): Result;
}

export namespace NewVoteInPollEvent {
  export type InputTuple = [newVote: PollContract.VoteStruct];
  export type OutputTuple = [newVote: PollContract.VoteStructOutput];
  export interface OutputObject {
    newVote: PollContract.VoteStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PollCreatedEvent {
  export type InputTuple = [pollCreated: PollContract.PollStruct];
  export type OutputTuple = [pollCreated: PollContract.PollStructOutput];
  export interface OutputObject {
    pollCreated: PollContract.PollStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PollContractAbi extends BaseContract {
  connect(runner?: ContractRunner | null): PollContractAbi;
  waitForDeployment(): Promise<this>;

  interface: PollContractAbiInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  createPoll: TypedContractMethod<
    [
      _name: string,
      _description: string,
      _allowMultipleOptionsSelected: boolean,
      _closesAt: BigNumberish,
      _options: string[]
    ],
    [void],
    "payable"
  >;

  getMyVoteInPoll: TypedContractMethod<
    [_pollId: BigNumberish],
    [PollContract.VoteStructOutput],
    "view"
  >;

  getPollById: TypedContractMethod<
    [_pollId: BigNumberish],
    [
      [PollContract.PollStructOutput, PollContract.OptionStructOutput[], bigint]
    ],
    "view"
  >;

  getPollVotes: TypedContractMethod<
    [_pollId: BigNumberish],
    [PollContract.VoteStructOutput[]],
    "view"
  >;

  getPolls: TypedContractMethod<[], [PollContract.PollStructOutput[]], "view">;

  getPollsCount: TypedContractMethod<[], [bigint], "view">;

  votePoll: TypedContractMethod<
    [_pollId: BigNumberish, optionsVotedIds: BigNumberish[]],
    [void],
    "payable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createPoll"
  ): TypedContractMethod<
    [
      _name: string,
      _description: string,
      _allowMultipleOptionsSelected: boolean,
      _closesAt: BigNumberish,
      _options: string[]
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getMyVoteInPoll"
  ): TypedContractMethod<
    [_pollId: BigNumberish],
    [PollContract.VoteStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPollById"
  ): TypedContractMethod<
    [_pollId: BigNumberish],
    [
      [PollContract.PollStructOutput, PollContract.OptionStructOutput[], bigint]
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPollVotes"
  ): TypedContractMethod<
    [_pollId: BigNumberish],
    [PollContract.VoteStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPolls"
  ): TypedContractMethod<[], [PollContract.PollStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getPollsCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "votePoll"
  ): TypedContractMethod<
    [_pollId: BigNumberish, optionsVotedIds: BigNumberish[]],
    [void],
    "payable"
  >;

  getEvent(
    key: "NewVoteInPoll"
  ): TypedContractEvent<
    NewVoteInPollEvent.InputTuple,
    NewVoteInPollEvent.OutputTuple,
    NewVoteInPollEvent.OutputObject
  >;
  getEvent(
    key: "PollCreated"
  ): TypedContractEvent<
    PollCreatedEvent.InputTuple,
    PollCreatedEvent.OutputTuple,
    PollCreatedEvent.OutputObject
  >;

  filters: {
    "NewVoteInPoll(tuple)": TypedContractEvent<
      NewVoteInPollEvent.InputTuple,
      NewVoteInPollEvent.OutputTuple,
      NewVoteInPollEvent.OutputObject
    >;
    NewVoteInPoll: TypedContractEvent<
      NewVoteInPollEvent.InputTuple,
      NewVoteInPollEvent.OutputTuple,
      NewVoteInPollEvent.OutputObject
    >;

    "PollCreated(tuple)": TypedContractEvent<
      PollCreatedEvent.InputTuple,
      PollCreatedEvent.OutputTuple,
      PollCreatedEvent.OutputObject
    >;
    PollCreated: TypedContractEvent<
      PollCreatedEvent.InputTuple,
      PollCreatedEvent.OutputTuple,
      PollCreatedEvent.OutputObject
    >;
  };
}
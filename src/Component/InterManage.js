import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "./commenuse/Pagination";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";

function InterManage() {
  return <>INTERVIEW MANAGEMENT</>;
}

export default InterManage;

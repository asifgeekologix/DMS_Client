import Axios from 'axios';
import { setHeader } from '../_helper/apiHeader';
import { getResponseData } from '../_helper/getResponse';



export async function saveConfigData(params) {
  try {
    const response = await Axios.post(`${process.env.BASE_URL}Configuration/SaveConfiguration`, params, setHeader())
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getConfigData() {
  try {
    const response = await Axios.get(`${process.env.BASE_URL}Configuration/GetConfiguration`, {}, setHeader())
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}


export async function getFilesData(id) {
  try {
    let response = null;
    if (id) {
      response = await Axios.get(`${process.env.BASE_URL}Storage/GetStorageFiles/${id}`, {}, setHeader())
    } else {
      response = await Axios.get(`${process.env.BASE_URL}Storage/GetStorageFiles`, {}, setHeader())
    }
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function downloadFileData(id) {
  try {
    const response = await Axios.get(`${process.env.BASE_URL}Storage/DownloadFile/${id}`, {}, setHeader())
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getFolderListData() {
  try {
    const response = await Axios.get(`${process.env.BASE_URL}Storage/FolderLists`, {}, setHeader())
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function searchFileData(params) {
  try {
    const response = await Axios.post(`${process.env.BASE_URL}Storage/SearchFiles`, params, setHeader())
    const res = getResponseData(response['data'])
    return res;
  } catch (err) {
    console.log(err);
  }
}

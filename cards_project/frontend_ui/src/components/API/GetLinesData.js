import axios from "axios";
import { API_Url } from "../../App";


export class fetchBankNamesAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/banks/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name_eng };
        });
        return modifiedKeys
    }
}

export class fetchPaymentSystemsAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/payment-systems/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchChipColorAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/chip-colors/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchMaterialtTypesAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/material-types/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchMaterialtColorsAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/material-colors/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchMagstripeColorsAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/magstripe-colors/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchEffectsAPI {
    static async getAll() {
        const response = await axios.get(`${API_Url}/api/effects/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        return modifiedKeys
    }
}

export class fetchChipNamesAPI {
    static async getAll(id) {
        const response = await axios.get(`${API_Url}/api/chips/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.short_name };
        });
        const filteredData = modifiedKeys.filter(item => item.payment_system === id);
        return filteredData
    }
}

export class fetchCardsСategoriesAPI {
    static async getAll(id) {
        const response = await axios.get(`${API_Url}/api/cards-categories/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        const filteredData = modifiedKeys.filter(item => item.payment_system === id);
        return filteredData
    }
}

export class fetchBankEmployeesAPI {
    static async getAll(id) {
        const response = await axios.get(`${API_Url}/api/bank-employees/`)
        const modifiedKeys = response.data.map(item => {
            return { ...item, value: item.name };
        });
        const filteredData = modifiedKeys.filter(item => item.bank === id);
        return filteredData
    }
}

export class fetchFilesAPI {
    static async getAll(id, urlComponentName, lineType) {
        const response = await axios.get(`${API_Url}/api/files/`)
        const filteredData = response.data.filter(item => item.line_number === id && item.process_step === urlComponentName && item.line_type === lineType);
        return filteredData
    }
}

export class fetchProcessDataAPI {
    static async getAll(id, urlComponentName, lineType) {
        const response = await axios.get(`${API_Url}/api/process-data/`)
        const filteredData = response.data.filter(item => item.line_number === id && item.process_step === urlComponentName && item.line_type === lineType);
        return filteredData
    }
}
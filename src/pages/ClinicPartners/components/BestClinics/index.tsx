import React, { useEffect } from "react";
import { useApi } from "../../../../hooks";
import { Error, Loading } from "../../../../components";
import apiEndpoints from "../../../../apiEndpoints";

export const BestClinics: React.FC = () => {

    const { callApi, response, loading, error } = useApi()

    useEffect(() => {
        callApi({
            endpoint: apiEndpoints.partners.best
        })
    }, [])


    useEffect(() => {
        if(response){
            console.log(response);
        }
    }, [response])

    return (
        <>
            {
                loading ? <Loading />
                    : error ? <Error />
                        : <div className="flex flex-col items-center lg:py-24 lg:px-20 bg-gray-50">
                            <div className="w-full">
                                <h1 className="text-4xl font-semibold">A few of our top partners</h1>
                            </div>
                            <div>

                            </div>
                        </div>
            }
        </>
    )
}
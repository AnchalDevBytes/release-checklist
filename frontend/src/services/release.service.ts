import { fetcher } from "@/lib/fetcher";
import { API_BASE_URL } from "@/constants/api";
import {
Release,
CreateReleasePayload,
UpdateReleasePayload,
ToggleStepPayload
} from "@/types/release";

export const releaseService={

getAll(){

return fetcher<Release[]>(
`${API_BASE_URL}/releases`
);

},

getById(id:number){

return fetcher<Release>(
`${API_BASE_URL}/releases/${id}`
);

},

create(payload:CreateReleasePayload){

return fetcher<Release>(
`${API_BASE_URL}/releases`,
{
method:"POST",
body:JSON.stringify(payload)
}
);

},

update(id:number,payload:UpdateReleasePayload){

return fetcher<Release>(
`${API_BASE_URL}/releases/${id}`,
{
method:"PATCH",
body:JSON.stringify(payload)
}
);

},

toggleStep(stepId:number,payload:ToggleStepPayload){

return fetcher<Release>(
`${API_BASE_URL}/releases/steps/${stepId}`,
{
method:"PATCH",
body:JSON.stringify(payload)
}
);

},

delete(id:number){

    return fetcher<void>(
        `${API_BASE_URL}/releases/${id}`,
    {
        method:"DELETE"
    }
    );

}

}

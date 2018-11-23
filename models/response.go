package models

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Status      int    `json:"status"`
	Message     string `json:"message"`
	contentType string
	writer      http.ResponseWriter
}

func (r *Response) Created() {
	r.Status = http.StatusCreated
	r.Message = "Created"
}

func (r *Response) BadRequest() {
	r.Status = http.StatusBadRequest
	r.Message = "Bad Request"
}

func (r *Response) NotFound() {
	r.Status = http.StatusNotFound
	r.Message = "Resource not found"
}

func (r *Response) UnprocessableEntity() {
	r.Status = http.StatusUnprocessableEntity
	r.Message = "Unprocessable Entity"
}

func (r *Response) BadGateway() {
	r.Status = http.StatusBadGateway
	r.Message = "Bad Gateway"
}

func (r *Response) Send() {
	r.writer.Header().Set("Content-Type", r.contentType)
	r.writer.WriteHeader(r.Status)

	output, _ := json.Marshal(&r)
	fmt.Fprintf(r.writer, string(output))
}

func CreateDefaultResponse(w http.ResponseWriter) Response {
	return Response{Status: http.StatusOK, writer: w, contentType: "application/json"}
}

func SendCreated(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Created()
	response.Send()
}

func SendBadRequest(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.BadRequest()
	response.Send()
}

func SendNotFound(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.NotFound()
	response.Send()
}

func SendUnprocessableEntity(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.UnprocessableEntity()
	response.Send()
}

func SendBadGateway(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.UnprocessableEntity()
	response.Send()
}

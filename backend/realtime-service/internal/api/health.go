package api

import (
	"encoding/json"
	"net/http"
	"time"
)

var startedAt = time.Now()

type healthResponse struct {
	Status    string  `json:"status"`
	Service   string  `json:"service"`
	Timestamp string  `json:"timestamp"`
	Uptime    float64 `json:"uptime"`
}

func HealthHandler(w http.ResponseWriter, _ *http.Request) {
	resp := healthResponse{
		Status:    "ok",
		Service:   "realtime-service",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
		Uptime:    time.Since(startedAt).Seconds(),
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(resp)
}

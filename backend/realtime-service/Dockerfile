# --- builder ---
FROM golang:1.22-alpine AS builder
WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY cmd ./cmd
COPY internal ./internal
COPY pkg ./pkg

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags='-s -w' -o /out/realtime ./cmd/realtime

# --- runner ---
FROM alpine:3.20 AS runner
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=builder /out/realtime /app/realtime

EXPOSE 5000
ENTRYPOINT ["/app/realtime"]

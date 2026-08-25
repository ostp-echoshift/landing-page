// otp_generator.cpp
// Generador criptográficamente seguro de códigos OTP (6 dígitos)
// Compilación: g++ -std=c++17 -O2 -o otp_generator generator.cpp
// Uso: ./otp_generator [ttl_minutos]  →  {"code":"847291","expires_at":"2026-04-26T15:30:00Z","ttl_minutes":15}

#include <iostream>
#include <random>
#include <chrono>
#include <iomanip>
#include <sstream>
#include <string>
#include <stdexcept>

#ifdef _WIN32
    #include <windows.h>
    #include <bcrypt.h>
    #pragma comment(lib, "bcrypt.lib")
#else
    #include <fstream>
#endif

std::string generate_secure_otp(int length = 6) {
    uint32_t raw = 0;
    const int min_val = 100000; // 6 dígitos: 100000-999999
    const int max_val = 999999;

#ifdef _WIN32
    NTSTATUS status = BCryptGenRandom(nullptr, reinterpret_cast<BYTE*>(&raw), sizeof(raw), BCRYPT_USE_SYSTEM_PREFERRED_RNG);
    if (!BCRYPT_SUCCESS(status)) throw std::runtime_error("Error generador criptográfico Windows");
#else
    std::ifstream urandom("/dev/urandom", std::ios::binary);
    if (!urandom.read(reinterpret_cast<char*>(&raw), sizeof(raw))) throw std::runtime_error("Error leyendo /dev/urandom");
    urandom.close();
#endif

    // Mapeo uniforme a rango [100000, 999999]
    std::uniform_int_distribution<int> dist(min_val, max_val);
    // Usamos raw como semilla segura para distribución uniforme
    std::mt19937 gen(raw);
    return std::to_string(dist(gen));
}

std::string get_iso_timestamp(int minutes_from_now) {
    auto now = std::chrono::system_clock::now();
    auto exp = now + std::chrono::minutes(minutes_from_now);
    auto time_t = std::chrono::system_clock::to_time_t(exp);
    std::tm tm_buf;
#ifdef _WIN32
    gmtime_s(&tm_buf, &time_t);
#else
    gmtime_r(&time_t, &tm_buf);
#endif
    std::ostringstream oss;
    oss << std::put_time(&tm_buf, "%Y-%m-%dT%H:%M:%SZ");
    return oss.str();
}

int main(int argc, char* argv[]) {
    try {
        int ttl = 15; // Default: 15 minutos
        if (argc > 1) {
            ttl = std::stoi(argv[1]);
            if (ttl <= 0 || ttl > 60) throw std::invalid_argument("TTL debe estar entre 1 y 60 minutos");
        }

        std::string code = generate_secure_otp(6);
        std::string expires = get_iso_timestamp(ttl);

        // Salida JSON estricta para parseo fácil en PHP/JS
        std::cout << "{\"code\":\"" << code << "\",\"expires_at\":\"" << expires << "\",\"ttl_minutes\":" << ttl << "}\n";
        return 0;
    } catch (const std::exception& e) {
        std::cerr << "{\"error\":\"" << e.what() << "\"}\n";
        return 1;
    }
}
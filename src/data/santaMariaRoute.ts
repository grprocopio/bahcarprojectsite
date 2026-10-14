// Rota real conectada de Santa Maria - RS
// Dados extraídos das vias reais do OpenStreetMap:
// 1. Avenida Fernando Ferrari (origem - MOTORISTA)
// 2. Rua Conrado Hoffmann (curva à direita)
// 3. Rua General Neto (curva à esquerda rumo ao destino - PASSAGEIRO)

export interface RoutePoint {
  x: number;
  y: number;
}

export interface RouteMetadata {
  description: string;
  streets: string[];
  driverPoint: RoutePoint;
  passengerPoint: RoutePoint;
  pathD: string;
  totalLength: number;
}

export const SANTA_MARIA_ROUTE: RouteMetadata = {
  description: 'Conexão animada entre Motorista (Av. Fernando Ferrari) e Passageiro (Rua General Neto / Medianeira)',
  streets: [
    'Avenida Fernando Ferrari',
    'Rua Conrado Hoffmann',
    'Rua General Neto',
  ],
  driverPoint: { x: 788.7, y: 568.4 },
  passengerPoint: { x: 729.5, y: 457.1 },
  // Caminho contínuo estritamente sobre a malha viária real de Santa Maria
  pathD: 'M788.7 568.4 L775.5 559.5 L766.9 552.4 L764.2 550.2 L763.5 549.6 L747.5 534 L742.3 529 L732.5 519.1 L735.6 516.8 L741.5 512.5 L751 505.5 L758 500.3 L761.6 497.7 L767.5 493.4 L765.2 491.2 L763.2 489.3 L748.9 475.7 L745.7 472.6 L744.5 471.5 L742.6 469.6 L738.9 466.2 L736.6 464 L730.2 457.9 L729.5 457.1',
  totalLength: 170.9,
};

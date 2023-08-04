{
  description = "tybalt - A library for creating web components";
  inputs = {
    nixpkgs = { url = "github:NixOS/nixpkgs/release-23.05"; };
    turbo = {
      url = "github:alexghr/turborepo.nix/v1.10.12";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    utils = { url = "github:numtide/flake-utils"; };
  };

  outputs = { self, nixpkgs, turbo, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = [ pkgs.bashInteractive ];
          buildInputs = [ turbo.packages.${system}.default ]
            ++ (with pkgs.nodePackages; [ npm yarn ]);
          TURBO_BINARY_PATH="${turbo.packages.${system}.default}/bin/turbo";
        };
      }
    );
}

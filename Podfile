# Podfile — stack de anuncios (Unity LevelPlay / ironSource) para Divix.
#
# El código Swift es AGNÓSTICO DE RED: añadir/quitar una red de mediación =
# tocar SOLO este Podfile (+ configurar la instancia en el dashboard de
# LevelPlay). La única excepción es el registro del test device de AdMob en
# DEBUG (AdsManager), acotado con #if canImport(GoogleMobileAds).
#
# A partir de la integración de CocoaPods se compila/abre Divix.xcworkspace,
# NO el .xcodeproj.
#
# Este proyecto NO usa XcodeGen: el .pbxproj es el fichero real y definitivo,
# así que los ficheros fuente nuevos hay que darlos de alta en él (no basta con
# crearlos en disco).
#
# En esta ruta de iCloud, ejecutar pod siempre con locale UTF-8:
#   LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 pod install

platform :ios, '17.0'
project 'Divix.xcodeproj'

use_frameworks!

target 'Divix' do
  # SDK de mediación unificado (LevelPlay 8.x, API LPM* / LevelPlay).
  pod 'IronSourceSDK', '~> 8.7'

  # Adaptadores de red — cada uno arrastra el SDK de su red.
  # La demanda propia de ironSource ("ironsourceads") no necesita adaptador:
  # viene en el SDK base.
  pod 'IronSourceUnityAdsAdapter'
  pod 'IronSourceAdMobAdapter'
  pod 'IronSourceFacebookAdapter'

  # CMP de Google (User Messaging Platform) para consentimiento GDPR/EEA.
  pod 'GoogleUserMessagingPlatform'

  # El target de tests compila fuentes de la app que importan la mediación, así
  # que necesita VER los módulos de los pods para compilar. No hace falta
  # enlazarlos: al ser tests hospedados (TEST_HOST/BUNDLE_LOADER apuntan a
  # Divix.app), los símbolos se resuelven contra la app en tiempo de carga.
  # De ahí :search_paths y no la herencia completa, que duplicaría los
  # frameworks en el bundle de tests.
  target 'DivixTests' do
    inherit! :search_paths
  end
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      # Alinear el deployment target de los pods con la app (iOS 17).
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '17.0'
      # Xcode 26 activa el sandbox de scripts; desactivarlo también en los
      # pods o el embed-frameworks falla con "Operation not permitted".
      config.build_settings['ENABLE_USER_SCRIPT_SANDBOXING'] = 'NO'
    end
  end
end
